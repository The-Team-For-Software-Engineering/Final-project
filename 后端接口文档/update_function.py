# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Update_function = Blueprint("update_function", __name__)
@Update_function.route('/admin/function/update_function',methods=['POST'])
def update_function():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
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
    sql = "select user_ID from functions where project_key='%s'"% (project_key)
    cursor.execute(sql)
    t_ID = cursor.fetchone()
    if t_ID == user_ID:
        sql = "delete from functions where project_key='%s'" %(project_key)
        cursor.execute(sql)
        conn.commit()
        s = 1
        res = {}
        res['code'] = s
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "权限不足"
        res['msg'] = msg
        
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)