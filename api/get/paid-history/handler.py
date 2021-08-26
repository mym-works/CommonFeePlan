# -*- coding: utf-8 -*-
import json
import boto3
import datetime
import calendar
import urllib.parse
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')


def decimal_default_proc(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    raise TypeError


def items_query(house_name, tenant_name, begin_dt_str, end_dt_str):
    dynamodb_table = dynamodb.Table('borderless-common-fee')
    db_response = dynamodb_table.query(
        KeyConditionExpression=Key('House').eq(
            house_name) & Key('Timestamp').between(begin_dt_str, end_dt_str),
        FilterExpression=Attr('Type').eq(
            'Pay') & Attr('Tenant').eq(tenant_name)
    )
    return db_response['Items']


def main(event, context):
    event_path = event['path']
    house_name = (event_path.split('/'))[-2]
    tenant_name_url = (event_path.split('/'))[-1]
    print(tenant_name_url)
    
    # Encode URL (include space and Japanese)
    tenant_name = urllib.parse.unquote(tenant_name_url)

    # To get each person paid history for last 1 year
    now_dt = datetime.datetime.now()
    end_day = calendar.monthrange(now_dt.year, now_dt.month)[1]
    end_dt_str = datetime.datetime(
        now_dt.year, now_dt.month, end_day).strftime("%Y/%m/%d")
    begin_dt_str = now_dt.replace(
        year=now_dt.year-1, day=1).strftime("%Y/%m/%d")

    db_response = items_query(house_name.capitalize(), tenant_name,
                              begin_dt_str, end_dt_str)

    print(db_response)
    response = {
        "statusCode": 200,
        "headers": {
            "content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        "body": json.dumps(db_response, ensure_ascii=False, default=decimal_default_proc)
    }

    return response
