# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
De_function = Blueprint("de_function", __name__)
@De_function.route('/user/de_function',methods=['POST'])
def de_function():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    #body  = str(json.loads(request.values.get("body")))#获取参数，即使body是空也需要传入
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
    sql = "select user_ID from functions where project_key=%s"% (project_key)
    cursor.execute(sql)
    t_ID = cursor.fetchone()

    if t_ID == user_ID:
        #删除对象
        sql = "delete from functions where project_key=%s"% (project_key)
        cursor.execute(sql)
        #time_update = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        s = 1
        res = {}
        res['code'] = s
        #res['time_update'] = time_update
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "权限不足"
        res['msg'] = msg
        
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)