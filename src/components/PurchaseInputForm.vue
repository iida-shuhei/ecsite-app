<template>
  <div>
    <b-container class="container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
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
                :clearable="false"
                :picker-options="pickerOptions"
                placeholder="日にち"
                v-model="ruleForm.deliveryDate"
                style="width: 100%;"
              >
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
        <el-form-item
          label="クレジットカード番号"
          prop="cardNumber"
          v-if="ruleForm.paymentMethod == 2"
        >
          <el-input v-model="ruleForm.cardNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="有効期限"
          v-if="ruleForm.paymentMethod == 2"
          prop="cardExpYearAndMonth"
        >
          <el-date-picker
            v-model="ruleForm.cardExpYearAndMonth"
            type="month"
            :picker-options="pickerOnlyYearAndMonthOptions"
            placeholder="年月を選択"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="カード名義人"
          prop="cardName"
          v-if="ruleForm.paymentMethod == 2"
        >
          <el-input v-model="ruleForm.cardName"></el-input>
        </el-form-item>
        <el-form-item
          label="セキュリティコード"
          prop="cardCvv"
          v-if="ruleForm.paymentMethod == 2"
        >
          <el-input v-model="ruleForm.cardCvv"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >購入</el-button
          >
          <el-button @click="resetForm('ruleForm')">クリア</el-button>
        </el-form-item>
      </el-form>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      ruleForm: {
        name: "",
        email: "",
        telephone: "",
        zipcode: "",
        address: "",
        deliveryDate: "",
        deliveryTime: "",
        paymentMethod: "1",
        cardNumber: "",
        cardExpYearAndMonth: "",
        cardName: "",
        cardCvv: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      pickerOnlyYearAndMonthOptions: {
        disabledDate(time) {
          return time.getTime() < new Date();
        },
      },
      rules: {
        name: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "メールを入力してください",
            trigger: "change",
          },
        ],
        telephone: [
          {
            pattern: /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/,
            required: true,
            message: "固定電話10桁〜携帯電話11桁の数値を入力してください",
            trigger: "change",
          },
        ],
        zipcode: [
          {
            pattern: /^\d{3}-?\d{4}$/g,
            required: true,
            message: "郵便番号を入力してください",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "住所を入力してください",
            trigger: "change",
          },
        ],
        deliveryDate: [
          {
            type: "date",
            required: true,
            message: "日にちを選択してください",
            trigger: "change",
          },
        ],
        deliveryTime: [
          {
            required: true,
            message: "時間を選択してください",
            trigger: "change",
          },
        ],
        paymentMethod: [
          {
            required: true,
            message: "お支払い方法を選択してください",
            trigger: "change",
          },
        ],
        cardNumber: [
          {
            pattern: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/,
            required: true,
            message: "クレジットカード番号を入力してください",
            trigger: "change",
          },
        ],
        cardName: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "change",
          },
        ],
        cardExpYearAndMonth: [
          {
            required: true,
            message: "有効期限（年月）を入力してください",
            trigger: "change",
          },
        ],
        cardCvv: [
          {
            pattern: "^[0-9]{3}$",
            required: true,
            message: "セキュリティーコードは3桁の数字を入力してください",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      (this.userId = this.$store.state.loginUser.id),
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post("/purchase", {
              userId: this.$store.state.loginUser.id,
              destinationName: this.ruleForm.name,
              destinationEmail: this.ruleForm.email,
              destinationZipcode: this.ruleForm.zipcode,
              destinationAddress: this.ruleForm.address,
              destinationTel: this.ruleForm.telephone,
              totalPrice: this.$route.params.totalPrice,
              deliveryDate: moment(this.ruleForm.deliveryDate).format(
                "YYYY-MM-DD"
              ),
              deliveryTime: this.ruleForm.deliveryTime,
              paymentMethod: this.ruleForm.paymentMethod,
              cardNumber: this.ruleForm.cardNumber,
              cardName: this.ruleForm.cardName,
              cardExpYear: this.ruleForm.cardExpYear,
              cardExpMonth: this.ruleForm.cardExpMonth,
              cardCvv: this.ruleForm.cardCvv,
            }).then;

            alert("ご注文ありがとうございました");
            this.$router.push("/");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      //注文ステータス２（購入済み）の注文履歴を受け取る
      axios
        .post("/purchaseHistory", {
          userId: this.$store.state.loginUser.id,
        })
        .then((response) => {
          console.log(response.data)
          this.$store.dispatch("setPurchaseHistory", response.data);
          console.log(this.$store.state.purchaseHistory);
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.deliveryDate = new Date().toISOString().substr(0, 10);
    axios
      .post("http://localhost:8080/login/findById", {
        userId: 1,
      })
      .then((res) => {
        this.ruleForm.name = res.data.name;
        this.ruleForm.email = res.data.email;
        this.ruleForm.zipcode = res.data.zipcode;
        this.ruleForm.address = res.data.address;
        this.ruleForm.telephone = res.data.telephone;
      });
  },
};
</script>

<style scoped>
.container {
  width: 700px;
}
.card {
  text-align: right;
}
</style>
