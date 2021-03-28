import {expect} from 'chai'
import app from './index'
import supertest from 'supertest'
import 'mocha'

describe('something', function() {
    it('should do something', function(done){
        supertest(app)
        .get('/')
        .expect(200)
        .end((err, res)=> {
            expect(res.text).to.equal('Express + TS')
            done()
        })
    })
})
