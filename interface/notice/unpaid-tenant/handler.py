import os
import json
import datetime
import requests
from requests.models import parse_url
import boto3


MEMBER_URL = 'https://api.borderless.mym.works/member/'
PAID_MEM_URL = 'https://api.borderless.mym.works/paidthismonth/'


class LINEInfo:
    # Get LINE secret information from AWS secret manager
    def __init__(self):
        secret_name = os.environ['SECRET_NAME']
        secretsmanager_client = boto3.client('secretsmanager', region_name='ap-northeast-1')
        resp = secretsmanager_client.get_secret_value(SecretId=secret_name)
        secret = json.loads(resp['SecretString'])
        
        self.ACCESS_TOKEN = secret['ACCESS_TOKEN']
        self.GROUP_ID = secret['GROUP_ID']



def notice_line_to_unpaid(not_paid_member):
    line_info = LINEInfo()

    # load LINE Notice Json format and put any data
    unpaid_json = json.load(open('./json/unpaid_member.json', 'r'))
    unpaid_json['to'] = line_info.GROUP_ID

    # Get this month for English string
    current_month = datetime.datetime.now().strftime('%B')
    unpaid_json['messages'][0]['contents']['body']['contents'][0]['text'] = 'The following have not yet paid for ' + current_month + ':'

    for member in not_paid_member:
        child_json = {
            "type": "text",
            "text": member['Room'] + " " + member['Name'],
            "size": "lg",
            "margin": "md",
            "color": "#000000",
            "weight": "bold",
            "align": "start",
            "offsetStart": "10px"
        }
        unpaid_json['messages'][0]['contents']['body']['contents'].append(child_json)

    url = 'https://api.line.me/v2/bot/message/push'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ line_info.ACCESS_TOKEN
    }

    # convert from Python Object to JSON
    json_data = json.dumps(unpaid_json).encode('utf-8')

    # http POSTrequest
    response = requests.post(
        url,
        data=json_data,
        headers=headers
    )

    return response


def getBorderlessApi(house_name, url):
    secret_name = os.environ['SECRET_NAME']
    secretsmanager_client = boto3.client('secretsmanager', region_name='ap-northeast-1')
    resp = secretsmanager_client.get_secret_value(SecretId=secret_name)
    secret = json.loads(resp['SecretString'])
    
    access_token  = secret['API_GATEWAY_KEY']
    requestUrl = url + house_name
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': access_token
    }

    # http GET request
    response = requests.get(
        requestUrl,
        headers=headers
    )

    response_data = response.json()
    return response_data


def utilsNotPaidMember(house_member, paid_member):
    # Remove None element from house_member
    living_house_member = [x for x in house_member if x['Name'] != 'None']

    # Judge for not pay member and append to array
    not_paid_member = []
    for member in living_house_member:
        paid_flag = [True for x in paid_member if x['Tenant'] == member['Name']]
        if not paid_flag:
            print(member['Name'])
            not_paid_member.append(member)
    
    return not_paid_member


def main(event, context):
    house_name = 'oimachi'
    # Get House member
    house_member = getBorderlessApi(house_name, MEMBER_URL)
    # Get already paid member
    paid_member = getBorderlessApi(house_name, PAID_MEM_URL)

    # Calculate for not paid member
    not_paid_member = utilsNotPaidMember(house_member, paid_member)

    # notice 
    response = notice_line_to_unpaid(not_paid_member)
    
    return 'Response:' + str(response)
