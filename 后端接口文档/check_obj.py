#查看项目内对象内容
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

check_obj = Blueprint("check_obj", __name__)
@check_obj.route('/admin/item/check_obj',methods=['POST'])
def check_obj():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    filename = str(json.loads(request.values.get("filename")))#获取参数
    
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    cursor = conn.cursor()
    sql = "select user_perm from people_join where user_ID = %s" % (user_ID)
    cursor.execute(sql)
    up = cursor.fetchall()  # 获得user权限
    cursor.close()
    conn.close()  # 关闭连接（方便其他接口之后的开启）
    if up >=1
        cursor = conn.cursor()
        sql = "select body from object where project_key = %s and filename = %s" % (project_key,filename) 
        cursor.execute(sql)
        body = cursor.fetchall()#读取内容
        cursor.close()
        conn.close()#关闭连接（方便其他接口之后的开启）
        s = 1
        res = {}
        res['code'] = s
        res['txt'] = body
        return json.dumps(res)
        
    else:
        s = 0
        M="权限不足"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res)

