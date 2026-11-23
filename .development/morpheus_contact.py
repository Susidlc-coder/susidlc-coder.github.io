"""Email links for artwork inquiries on the static galleries."""
from html import escape
from urllib.parse import quote, urlencode
from site_footer import CONTACT


def email_link(lang, world, artwork=None):
    english = lang == "en"
    subject = f"Morpheus · {world.strip()}"
    if artwork:
        subject += f" · {artwork}"
    if english:
        body = f"Hello Susi,\r\n\r\nI'd like to know what is available for this artwork.\r\n\r\nArtwork number: {artwork or ''}\r\nPostal code: "
    else:
        body = f"Hola, Susi:\r\n\r\nMe gustaría conocer las opciones disponibles para esta obra.\r\n\r\nNúmero de obra: {artwork or ''}\r\nCódigo postal: "
    return escape(f"mailto:{CONTACT}?" + urlencode({"subject": subject, "body": body}, quote_via=quote))


def artwork_contact(lang, world, artwork):
    label = f"Email about artwork {artwork}" if lang == "en" else f"Consultar por correo sobre la obra {artwork}"
    return f'<a class="m-art-email" href="{email_link(lang, world, artwork)}" aria-label="{escape(label)}">{escape(artwork)} <span aria-hidden="true">↗</span></a>'


def inquiry(lang, world):
    english = lang == "en"
    title = "Interested in an artwork?" if english else "¿Te interesa una obra?"
    instructions = ("Email me the artwork number and your postal code for available merchandise and prices. Select a number below an artwork to include it in your message." if english else "Envíame el número de la obra y tu código postal para conocer las opciones disponibles y sus precios. Si tocas el número debajo de una obra, ya aparecerá en tu mensaje.")
    hint = "Review and send from your email app." if english else "Revisa y envía el mensaje desde tu aplicación de correo."
    return f'<section class="m-request" id="inquiry" aria-labelledby="request-title"><div><h2 id="request-title">{title}</h2></div><div><p>{instructions}</p><a class="m-direct-email" href="{email_link(lang, world)}">{CONTACT}</a><p class="m-mail-hint">{hint}</p></div></section>'
