import os
import json
import requests
import boto3

"""
Refer DynamoDB Data Structure: https://dev.classmethod.jp/articles/dynamodb-stream-view-type/
How to use Secret Manager: https://dev.classmethod.jp/articles/serverless-framework-lambdafunc-secretsmanager/
"""

class NoticeRecord:
    tenant = ''
    item = ''
    total_price = ''
    date = ''

class LINEInfo:
    # Get LINE secret information from AWS secret manager
    def __init__(self):
        secret_name = os.environ['SECRET_NAME']
        secretsmanager_client = boto3.client('secretsmanager', region_name='ap-northeast-1')
        resp = secretsmanager_client.get_secret_value(SecretId=secret_name)
        secret = json.loads(resp['SecretString'])
        
        self.ACCESS_TOKEN = secret['ACCESS_TOKEN']
        self.GROUP_ID = secret['GROUP_ID']


def notice_line_to_purchase(record):
    NoticeRecord.tenant       = record['NewImage']['Tenant']['S']
    NoticeRecord.item         = record['NewImage']['Item']['S']
    NoticeRecord.total_price  = record['NewImage']['TotalPrice']['N']
    NoticeRecord.date         = record['Keys']['Timestamp']['S']

    line_info = LINEInfo()

    # load LINE Notice Json format and put any data
    purchase_json = json.load(open('./json/purchase.json', 'r'))
    purchase_json['to'] = line_info.GROUP_ID
    purchase_json['messages'][0]['contents']['body']['contents'][0]['text'] = 'Tenant : ' + NoticeRecord.tenant
    purchase_json['messages'][0]['contents']['body']['contents'][1]['text'] = 'Item : ' + NoticeRecord.item
    purchase_json['messages'][0]['contents']['body']['contents'][2]['text'] = 'Total Price : ¥' + NoticeRecord.total_price
    purchase_json['messages'][0]['contents']['body']['contents'][3]['text'] = 'Date : ' + NoticeRecord.date
    print(purchase_json)

    url = 'https://api.line.me/v2/bot/message/push'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ line_info.ACCESS_TOKEN
    }

    # convert from Python Object to JSON
    json_data = json.dumps(purchase_json).encode('utf-8')

    # http POSTrequest
    response = requests.post(
        url,
        data=json_data,
        headers=headers
    )


def main(event, context):
    for stream_record in event['Records']:
        # Get DynamoDB Stream
        record = stream_record['dynamodb']
        record_type = stream_record['eventName']

        if record_type == 'INSERT':
            commonfee_type = record['NewImage']['Type']['S']
            if commonfee_type == 'Purchase':
                print(record)
                response = notice_line_to_purchase(record)
                print(response)

    return 'Successfully processed {} records.'.format(len(event['Records']))

