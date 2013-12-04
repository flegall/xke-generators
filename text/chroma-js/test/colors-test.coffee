
vows = require 'vows'
assert = require 'assert'
chroma = require '../chroma'


vows
    .describe('Some tests for chroma.color()')

    .addBatch

        'named colors':
            topic: chroma 'red'
            'hex': (topic) -> assert.equal topic.hex(), '#ff0000'
            'rgb': (topic) -> assert.deepEqual topic.rgb(), [255,0,0]

        'hex colors':
            topic: chroma '#f00'
            'name': (topic) -> assert.equal topic.name(), 'red'
            'hex': (topic) -> assert.equal topic.hex(), '#ff0000'
            'rgb': (topic) -> assert.deepEqual topic.rgb(), [255,0,0]

        'hex color, no #':
            topic: chroma 'F00'
            'name': (topic) -> assert.equal topic.name(), 'red'
            'hex': (topic) -> assert.equal topic.hex(), '#ff0000'
            'rgb': (topic) -> assert.deepEqual topic.rgb(), [255,0,0]

        'modify colors':
            topic: chroma 'F00'
            'darken': (topic) -> assert.equal topic.darken(10).hex(), '#dd0000'
            'darker': (topic) -> assert.equal topic.darker(10).hex(), '#dd0000'
            'brighten': (topic) -> assert.equal topic.brighten(10).hex(), '#ff3e20'
            'brighter': (topic) -> assert.equal topic.brighter(10).hex(), '#ff3e20'
            'saturate': (topic) -> assert.equal topic.saturate().hex(), '#ff0000'
            'desaturate': (topic) -> assert.equal topic.desaturate().hex(), '#ec3d23'

        'css colors':
            topic: chroma 'rgb(255,0,0)'
            'hex': (topic) -> assert.equal topic.hex(), '#ff0000'

        'rgb color':
            topic: chroma 255,0,0
            'hex': (topic) -> assert.equal topic.hex(), '#ff0000'

        'hsv black':
            topic: chroma('black').hsv()
            'hue is NaN': (topic) -> assert isNaN topic[0]
            'but hue is defined': (topic) -> assert topic[0]?

        'interpolate in hsv':
            topic: chroma.interpolate 'white', 'black', 0.5, 'hsv'
            'hex': (topic) -> assert.equal topic.hex(), '#808080'

        'hsl black':
            topic: chroma('black').hsl()
            'hue is NaN': (topic) -> assert isNaN topic[0]
            'but hue is defined': (topic) -> assert topic[0]?
            'sat is 0': (topic) -> assert.equal topic[1], 0
            'lightness is 0': (topic) -> assert.equal topic[2], 0

        'interpolate in hsl':
            topic: chroma.interpolate 'lightyellow', 'navy', 0.5, 'hsl'
            'hex': (topic) -> assert.equal topic.hex(), '#31ff98'

    .export(module)