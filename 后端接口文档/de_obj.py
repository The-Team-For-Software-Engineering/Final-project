# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
De_obj = Blueprint("de_obj", __name__)
@De_obj.route('/admin/item/de_obj',methods=['POST'])
def de_obj():
    project_key = str(json.loads(request.values.get("project_key")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    filename = str(json.loads(request.values.get("filename")))#获取参数，即使body是空也需要传入
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
    sql = "select user_perm from people_join where (user_ID='%s' and project_key ='%s')"% (user_ID, project_key)
    cursor.execute(sql)
    temp = cursor.fetchall()
    if len(temp)>0:
        perm = int(temp[0][0])
        if (perm >= 4):
            #获取filekey
            sql = "delete from objects where project_key = '%s' and filename = '%s'" % (project_key, filename)
            cursor.execute(sql)
            conn.commit()
            #获取时间
            time_update = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
            s = 1
            res = {}
            res['code'] = s
            res['time_update'] = time_update
        else:
            s = 0
            res = {}
            res['code'] = s
            msg = "权限不足"
            res['msg'] = msg
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "权限不足"
        res['msg'] = msg

    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)