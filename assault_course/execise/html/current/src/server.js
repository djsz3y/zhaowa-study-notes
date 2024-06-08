const path = require('path')
const express = require('express')

const app1 = express()
const app2 = express()

app1.use(express.static(path.resolve(__dirname, './iframe/a')))
app2.use(express.static(path.resolve(__dirname, './iframe/b')))

app1.listen(8101)
app2.listen(8102)