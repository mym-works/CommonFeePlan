# -*- coding: utf-8 -*-
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def items_put(house_name, body):
    dynamodb_table = dynamodb.Table('borderless-common-fee')

    for purchase_item in body:
        db_response = dynamodb_table.put_item(
            Item={
                'House': house_name,
                'Timestamp': purchase_item['Timestamp'],
                'Type': 'Purchase',
                'Tenant': purchase_item['Tenant'],
                'Item': purchase_item['Item'],
                'Price': int(purchase_item['Price']),
                'Quantity': int(purchase_item['Quantity']),
                'TotalPrice': int(purchase_item['TotalPrice'])
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
