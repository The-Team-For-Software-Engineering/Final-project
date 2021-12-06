#疑问：如何输出多组邀请码
# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Check_fcollectlist = Blueprint("check_fcollectlist", __name__)
@Check_fcollectlist.route('/admin/function/check_fcollectlist',methods=['POST'])
def check_fcollectlist():
    project_key = str(json.loads(request.values.get("user_ID")))
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
    sql = "select ? functions where project_key = '%s'" % (project_key)
    cursor.execute(sql)     
    test = cursor.fetchone()

    if len(test)>0:
        s = 1
        res = {}
        res['code'] = s
        res['test'] = test
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "找不到该收藏或内容为空"
        res['msg'] = msg

    cursor.close()
    conn.close()
    #关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)