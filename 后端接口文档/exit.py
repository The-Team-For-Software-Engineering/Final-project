# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Exit = Blueprint("exit", __name__)
@Exit.route('/admin/item/exit',methods=['POST'])
def exit():
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
    # 获取游标
    cursor = conn.cursor()
    #获取项目人数和
    sql = "select * from people_join where project_key='%s' and user_ID ='%s' and user_admin = 1" %(project_key, user_ID)
    cursor.execute(sql)
    u_a = cursor.fetchall()
    if len(u_a) > 0:
        s = 0
        res = {}
        res['code'] = s
        msg = "管理员不可退出！请移交管理权或解散项目"
        res['msg'] = msg
    else:
        sql = "update project set people_num = people_num-1 where project_key='%s'" %(project_key)
        cursor.execute(sql)
        conn.commit()
        sql = "delete from people_join where (project_key ='%s' and user_ID ='%s')" %(project_key, user_ID)
        cursor.execute(sql)
        conn.commit()
        s = 1
        res = {}
        res['code'] = s

    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)