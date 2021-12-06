# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
De_collect = Blueprint("de_collect", __name__)
@De_collect.route('/admin/collect/de_collect',methods=['POST'])
def de_collect():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
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

    sql = "delete from collect_table where (project_key ='%s' and user_ID ='%s')" % (project_key, user_ID)
    cursor.execute(sql)
    conn.commit()
    
    s = 1
    res = {}
    res['code'] = s

    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)