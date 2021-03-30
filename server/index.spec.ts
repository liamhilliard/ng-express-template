import {expect} from 'chai'
import app from './index'
import supertest from 'supertest'
import 'mocha'

describe('something', () => {
    it('should do something', (done) => {
        supertest(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) { return done(err) }
            expect(res.text).to.equal('Express + TS')
            return done()
        })
    })
})
