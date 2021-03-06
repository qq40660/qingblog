# -*- coding: utf-8 -*-

import os
import web
from jinja2 import Environment, FileSystemLoader
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
web.config.debug = True

ROOT = os.path.dirname(os.path.abspath(__file__))
path = lambda *a: os.path.join(ROOT, *a)

def render_template(template_name, **context):
    extensions = context.pop('extensions', [])
    globals = context.pop('globals', {})

    jinja_env = Environment(
        loader=FileSystemLoader(path('templates')),
        extensions=extensions,
        )

    jinja_env.globals.update(globals)
    return jinja_env.get_template(template_name).render(context)

#database config
engine = create_engine('sqlite:///qing.db', encoding="utf-8", echo=True)

def load_sqla(handler):
    web.ctx.orm = scoped_session(sessionmaker(bind=engine))
    try:
        return handler()
    except web.HTTPError:
        web.ctx.orm.commit()
        raise
    except:
        web.ctx.orm.rollback()
        raise
    finally:
        web.ctx.orm.commit()
        web.ctx.orm.close()

web.config.smtp_server = 'smtp.mailgun.org'
#web.config.smtp_port = 587
web.config.smtp_username = 'postmaster@sll.mailgun.org'
web.config.smtp_password = '5yh0dp3nk5m3'
web.config.smtp_starttls = True
