# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
New_obj = Blueprint("new_obj", __name__)
@New_obj.route('/user/new_obj',methods=['POST'])
def new_obj():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    filename = str(json.loads(request.values.get("filename")))
    body  = str(json.loads(request.values.get("body")))#获取参数，即使body是空也需要传入
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    #获取游标
    cursor = conn.cursor()
    #确认权限
    sql = "select user_perm from people_join where (user_ID=%s and project_key =%s)"% (user_ID, project_key)
    cursor.execute(sql)
    perm = cursor.fetchone()
    if (perm==3|perm==7):
        #插入数据
        sql = "insert into objects values(%s, %s, %s, %s)" % (project_key, user_ID, filename, body)
        cursor.execute(sql)
        #获取用户名
        sql = "select user_name from users where user_ID=%s" % (user_ID)
        cursor.execute(sql)
        user_name = cursor.fetchone()
        time_update = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        s = 1
        res = {}
        res['code'] = s
        res['time_update'] = time_update
        res['filename'] = filename
        res['user_name'] = user_name
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "权限不足"
        res['msg'] = msg
        
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)