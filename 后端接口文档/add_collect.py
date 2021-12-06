# coding=utf8
#testing
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Add_collect = Blueprint("add_collect", __name__)
@Add_collect.route('/user/add_collect',methods=['POST'])
def add_collect():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='toor',
        db='python',
        charset='utf8'
    )#连接数据库
    #获取游标
    cursor = conn.cursor()

    time_update = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    sql = "insert into collect_table values ('%s', '%s', '%s')" % (user_ID, project_key, time_update)
    cursor.execute(sql)
    conn.commit()

    s = 1
    res = {}
    res['code'] = s

    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)