#疑问：如何输出多组邀请码
# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Check_invite = Blueprint("check_invite", __name__)
@Check_invite.route('/admin/collect/check_collectlist',methods=['POST'])
def check_invite():
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
    #寻找根据user_ID确认user_admin=1所对应的project_key，再在相应的project_key找到对应的project_name和invitecode
    sql = "select project_key,project_type,project_name,time_create,time_update,notes,download_num from functions where project_key = any (select project_key from collect_table where user_ID = '%s');" % (user_ID)
    cursor.execute(sql)     
    list = cursor.fetchall()

    if len(list)>0:
        s = 1
        res = {}
        res['code'] = s
        res['list'] = list
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "没有收藏的项目"
        res['msg'] = msg

    cursor.close()
    conn.close()
    #关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)