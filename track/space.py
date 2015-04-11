#!/usr/bin/env python

from bottle import get, post, run, route, static_file, request
import bottle

@get('/')
def index():
    return open('homepage.html').read()


def store( fname, field ):
    f = open(fname, 'w')
    f.write( field )
    f.close()
    return

@post('/update')
def update():
    lon = request.forms.get('lat')
    lat = request.forms.get('lat')
    label = request.forms.get('label')
    store( 'loc.txt', str({ 'lat': lat, 'lon': lon, 'label': label }) )
    return 'Okay!'


@post('/update_field_a')
def update_field_a():
    label = request.forms.get('field_a')
    store( 'field_a.txt', str({ 'field_a': label }) )
    return 'Okay!'

@post('/update_field_b')
def update_field_b():
    label = request.forms.get('field_b')
    store( 'field_b.txt', str({ 'field_b': label }) )
    return 'Okay!'



@get('/loc')
def loc():
    return open('loc.txt', 'r').read()

@get('/field_a')
def field_a():
    return open('field_a.txt', 'r').read()

@get('/field_b')
def field_b():
    return open('field_b.txt', 'r').read()


@route('/static/<filename>')
def server_static( filename ):
    return static_file( filename, root='./')




#bottle.debug(True)
#run(host='localhost', port=8080, reloader=True)


if __name__ == '__main__':
    from wsgiref.handlers import CGIHandler
    CGIHandler().run(bottle.default_app())

