var mybuffer = new  Buffer('R0lGODlhFgAYAIAAAHbRSv///yH5BAAHAP8ALAAAAAAWABgAAAI2jI8AyH0Kl3MxzlTzzBziDkphaIxgaXJoWq2sF7xtLMO1fYu5K/Ovz/qkNqPLQ2UUKpIUyaQAADs===ii1j2i3h1i23h', 'base64');
require('fs').writeFile('logo.gif', mybuffer);
