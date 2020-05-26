<template>
  <div>

  <div class="price">
    <v-card
      class="card"
      max-width="344"
      raised
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ "合計 : " + this.$route.params.totalPrice.toLocaleString() + "円" }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
        >
        <v-icon x-large>mdi mdi-cart-outline</v-icon>
        </v-list-item-avatar>
      </v-list-item>

    </v-card>

    <b-container class="container">


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item label="名前" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="メール" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="電話番号" prop="telephone">
        <el-input v-model="ruleForm.telephone"></el-input>
      </el-form-item>

      <el-form-item label="郵便番号" prop="zipcode">
        <el-input v-model="ruleForm.zipcode"></el-input>
      </el-form-item>

      <el-form-item label="住所" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>

      <el-form-item label="配達希望日時" required>

        <el-col :span="11">
          <el-form-item prop="deliveryDate">
            <el-date-picker 
              type="date" 
              :clearable=false
              :picker-options="pickerOptions" 
              placeholder="日にち" 
              v-model="ruleForm.deliveryDate" 
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col class="line" :span="2"></el-col>

        <el-col :span="11">
          <el-form-item prop="deliveryTime">
            <el-time-select 
              placeholder="時間" 
              v-model="ruleForm.deliveryTime" 
              style="width: 100%;"
            >
            </el-time-select>
          </el-form-item>
        </el-col>

      </el-form-item>

      <el-form-item label="お支払い方法" prop="paymentMethod">
        <el-radio-group v-model="ruleForm.paymentMethod">
          <el-radio label="1">現金</el-radio>
          <el-radio label="2">クレジットカード</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">購入</el-button>
        <el-button @click="resetForm('ruleForm')">クリア</el-button>
      </el-form-item>

    </el-form>

    </b-container>
  </div>

  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          telephone:'',
          zipcode:'',
          address: '',
          deliveryDate: '',
          deliveryTime: '',
          paymentMethod: "1",
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '当日をご希望の方はこちらをクリック',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, 
          ]
        },
        rules: {
          name: [
            { required: true, message: '名前を入力してください', trigger: 'change' },
          ],
          email: [
            { type: 'email', required: true, message: 'メールを入力してください', trigger: 'change' },
          ],
          telephone: [
            { pattern: /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/, required: true, message: '固定電話10桁〜携帯電話11桁の数値を入力してください', trigger: 'change' },
          ],
          zipcode: [
            { pattern: /^\d{3}-?\d{4}$/g, required: true, message: '郵便番号を入力してください', trigger: 'change' },
          ],
          address: [
            { required: true, message: '住所を入力してください', trigger: 'change' },
          ],
          deliveryDate: [
            { type: 'date', required: true, message: '日にちを選択してください', trigger: 'change' }
          ],
          deliveryTime: [
            { required: true, message: '時間を選択してください', trigger: 'change' }
          ],
          paymentMethod: [
            { required: true, message: 'お支払い方法を選択してください', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post("http://localhost:8080/purchase", {
            userId: this.$store.state.loginUser.id,
            destinationName: this.ruleForm.name,
            destinationEmail: this.ruleForm.email,
            destinationZipcode: this.ruleForm.zipcode,
            destinationAddress: this.ruleForm.address,
            destinationTel: this.ruleForm.telephone,
            totalPrice: this.$route.params.totalPrice,
            deliveryDate: moment(this.ruleForm.deliveryDate).format("YYYY-MM-DD"),
            deliveryTime: this.ruleForm.deliveryTime,
            paymentMethod: this.ruleForm.paymentMethod
          }).then(console.log('成功'))
          this.$router.push('/top')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.deliveryDate = new Date().toISOString().substr(0, 10);
    }
  }
</script>

<style scoped>
  .container {
    width: 700px;
  }
  .card {
    text-align: right;
  }
  .price {
    float: right;
  }
</style>