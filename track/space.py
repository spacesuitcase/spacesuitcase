#!/usr/bin/env python

from bottle import get, post, run, route, static_file, request
import bottle

@get('/')
def index():
    return open('homepage.html').read()


@post('/update')
def update():
    f = open('loc.txt', 'w')
    lon = request.forms.get('lat')
    lat = request.forms.get('lat')
    label = request.forms.get('label')
    print(lon, lat, label)
    f.write(str({ 'lat': lat, 'lon': lon, 'label': label }))
    f.close()
    return


@get('/loc')
def loc():
    return open('loc.txt', 'r').read()


@route('/static/<filename>')
def server_static( filename ):
    return static_file( filename, root='./')




bottle.debug(True)
run(host='localhost', port=8080, reloader=True)


#if __name__ == '__main__':
#    from wsgiref.handlers import CGIHandler
#    CGIHandler().run(bottle.default_app())

