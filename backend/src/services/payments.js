const MongoLib = require('../lib/mongo');

class PaymentsService {
    constructor(){
        this.collection= 'payments';
        this.mongoDB = new MongoLib();
    }
    async getPayment({ idPayment }) {
        const payment = await this.mongoDB.get(this.collection, idPayment);
        return payment || {};
    }
    async getPayments({ idUser }) {
        const query = idUser && { idUser };
        const payments = await this.mongoDB.getAll(this.collection, query);
        return payments || [];
    }
    async createPayment({ payment }) {
        const { idUser, creditCardNumber, expirationDateMonth, year, cvv, creditCardType } = payment;
        const createPaymentId = await this.mongoDB.create(this.collection, {
            idUser,
            creditCardNumber,
            expirationDateMonth,
            year,
            cvv,
            creditCardType
        });
        return createPaymentId;
    }
    async deletePayment({ idPayment }){
        const deletedPaymentId = await this.mongoDB.delete(this.collection, idPayment);
        return deletedPaymentId;
      }
}
module.exports = PaymentsService;