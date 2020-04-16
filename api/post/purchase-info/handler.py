# -*- coding: utf-8 -*-
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def items_put(house_name, body):
    dynamodb_table = dynamodb.Table('borderless-common-fee')
    db_response = dynamodb_table.put_item(
        Item={
            'House': house_name,
            'Timestamp': body['Timestamp'],
            'Type': 'Purchase',
            'Tenant': body['Tenant'],
            'Item': body['Item'],
            'Price': int(body['Price'])
        }
    )
    return db_response


def main(event, context):
    event_path = event['path']
    house_name = (event_path.split('/'))[-1]

    body = json.loads(event['body'])

    db_response = items_put(house_name.capitalize(), body)

    response = {
        "statusCode": 200,
        "headers": {
            "content-type": "application/json"
        },
        "body": json.dumps(db_response, ensure_ascii=False)
    }

    return response
