<template>
  <div>
    <Navbar></Navbar>
    <v-card class="recibos-card" elevation="4" rounded="xl">
      <v-card-title class="justify-center text-center">
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" sm="12">
            <h2>Mis Recibos por Honorarios</h2>
          </v-col>
          <v-col cols="12" sm="12">
            <!-- CUADRO DE DIALOGO NUEVA FACTURA-->
            <v-dialog v-model="dialog" max-width="100vh">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                  Nuevo Recibo
                </v-btn>
              </template>

              <v-card class="card-dialog" rounded="xl" elevation="12">
                <v-card-title class="justify-center">
                  <span class="text-h3 formtitle">NUEVO RECIBO</span>
                </v-card-title>
                <v-alert v-if="error" color="red" type="error">
                  {{ error }}
                </v-alert>

                <v-card-text>
                  <v-form class="mt-12" @submit.prevent="addRecibo">
                    <v-container class="container-forms">
                      <v-row>
                        <v-col class="col-register" cols="12" sm="6">
                          <v-text-field
                            v-model="newRecibo.ruc"
                            label="RUC / DNI"
                            autofocus
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col class="col-register" cols="12" sm="6">
                          <v-text-field
                            v-model="newRecibo.empresa"
                            label="Razón Social / Nombre"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col class="col-register" cols="12" sm="6">
                          <v-text-field
                            v-model="newRecibo.emision"
                            type="date"
                            label="Fecha de emisión"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="col-register" cols="12" sm="6">
                          <v-text-field
                            v-model="newRecibo.fechapago"
                            type="date"
                            label="Fecha de Pago"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="col-register" cols="12" sm="6">
                          <v-row class="formtasa">
                            <v-col class="col-register" cols="12" sm="6">
                              <v-text-field
                                v-model="newRecibo.monto"
                                type="number"
                                outlined
                                label="Total a Recibir"
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-register" cols="12" sm="6">
                              <v-radio-group v-model="newRecibo.kindOfMoney">
                                <v-radio label="SOLES" value="SOLES"></v-radio>
                                <v-radio
                                  label="DÓLARES"
                                  value="DOLARES"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col class="col-register" cols="12" sm="6">
                          <v-text-field
                            v-if="newRecibo.monto == 0"
                            v-model="newRecibo.retencion"
                            placeholder="Retencion (8%)"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="newRecibo.retencion"
                            label="Click aquí y digitar el siguiente valor:"
                            :placeholder="newRecibo.monto * 0.08"
                            type="number"
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <div class="text-center mt-2">
                        <v-btn color="primary" x-large type="submit"
                          >Guardar Recibo</v-btn
                        >
                      </div>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialog3" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>
            <v-card class="results-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="text-h4">RESULTADOS</span>
              </v-card-title>
              <v-card-text class="justify-center">
                <table cellspacing="15">
                  <tbody>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva anual (Sin Costes):
                        <b>{{ newtcea.tea }}% </b>
                      </td>
                      <td style="height: 23px">
                        Costes Iniciales Totales: <b>{{ newtcea.ci }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Número de días transcurridos: <b>{{ newtcea.nd }}</b>
                      </td>
                      <td style="height: 23px">
                        Valor Neto: <b>{{ newtcea.vnet }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva a {{ newtcea.nd }} días:
                        <b>{{ newtcea.te }}%</b>
                      </td>
                      <td style="height: 23px">
                        Valor Total a Recibir: <b>{{ newtcea.vr }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Descontada a {{ newtcea.nd }} días:
                        <b>{{ newtcea.d }}%</b>
                      </td>
                      <td style="height: 23px">
                        Costes Finales Totales: <b>{{ newtcea.cf }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Descuento por días: <b>{{ newtcea._d }}</b>
                      </td>
                      <td style="height: 23px">
                        Valor Total a Entregar: <b>{{ newtcea.ve }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Retención: <b>{{ newtcea.retencion }}</b>
                      </td>
                      <td style="height: 23px">
                        <b
                          >Tasa de Coste Efectivo Anual (TCEA):
                          {{ newtcea.tcea }}%</b
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  large
                  color="primary"
                  width="150px"
                  @click="closeresults()"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog4" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>
            <v-card class="results-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="text-h4">RECIBO # {{ newtcea.reciboid }}</span>
              </v-card-title>
              <v-card-text class="justify-center">
                <table cellspacing="15">
                  <tbody>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva anual (Sin Costes):
                        <b>{{ newtcea.tea }}% </b>
                      </td>
                      <td style="height: 23px">
                        Costes Iniciales Totales: <b>{{ newtcea.ci }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Número de días transcurridos: <b>{{ newtcea.nd }}</b>
                      </td>
                      <td style="height: 23px">
                        Valor Neto: <b>{{ newtcea.vnet }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Efectiva a {{ newtcea.nd }} días:
                        <b>{{ newtcea.te }}%</b>
                      </td>
                      <td style="height: 23px">
                        Valor Total a Recibir: <b>{{ newtcea.vr }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Tasa Descontada a {{ newtcea.nd }} días:
                        <b>{{ newtcea.d }}%</b>
                      </td>
                      <td style="height: 23px">
                        Costes Finales Totales: <b>{{ newtcea.cf }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Descuento por días: <b>{{ newtcea._d }}</b>
                      </td>
                      <td style="height: 23px">
                        Valor Total a Entregar: <b>{{ newtcea.ve }}</b>
                      </td>
                    </tr>
                    <tr style="height: 23px">
                      <td style="height: 23px">
                        Retención: <b>{{ newtcea.retencion }}</b>
                      </td>
                      <td style="height: 23px">
                        <b
                          >Tasa de Coste Efectivo Anual (TCEA):
                          {{ newtcea.tcea }}%</b
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  large
                  color="primary"
                  width="150px"
                  @click="closeresults()"
                >
                  Salir
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--CUADRO DE DIALOGO CALCULTO TCEA-->
          <v-dialog v-model="dialog2" max-width="100vh">
            <template v-slot:activator="{ on, attrs }">
              <div color="primary" fab v-bind="attrs" v-on="on" disabled></div>
            </template>

            <v-card class="tcea-dialog" rounded="xl" elevation="12">
              <v-card-title class="justify-center">
                <span class="text-h3">CALCULAR RESULTADOS</span>
              </v-card-title>
              <v-card-text>
                <v-form class="mt-12" @submit.prevent="showTCEA">
                  <v-container class="container-forms">
                    <v-row>
                      <v-col cols="12" sm="6" class="sectiontcea">
                        <h3 class="text-center">
                          Datos del Recibo por Honorarios
                        </h3>
                        <br />
                        <!--Fecha de emisión-->
                        <v-row justify="center" align="center">
                          <v-col cols="12" sm="6">
                            <v-subheader>Fecha de Emisión: </v-subheader>
                            <v-text-field
                              v-model="newtcea.emision"
                              outlined
                              disabled
                              filled
                              type="date"
                              dense
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Fecha de Pago: </v-subheader>
                            <!--Fecha de pago-->
                            <v-text-field
                              v-model="newtcea.fechapago"
                              outlined
                              disabled
                              filled
                              type="date"
                              dense
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Total a Recibir:</v-subheader>
                            <v-text-field
                              v-model="newtcea.monto"
                              outlined
                              disabled
                              filled
                              dense
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Retención: </v-subheader>
                            <v-text-field
                              v-model="newtcea.retencion"
                              outlined
                              disabled
                              filled
                              dense
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6" class="sectiontcea">
                        <h3 class="text-center">Tasa y Plazo</h3>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-subheader>Días por año: </v-subheader>
                            <v-select
                              :items="days"
                              v-model="newtcea.dias"
                              placeholder="días por año"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Plazo de tasa: </v-subheader>
                            <v-select
                              :items="plazo"
                              v-model="newtcea.plazo"
                              placeholder="plazo de tasa"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Tasa: </v-subheader>
                            <v-row class="formtasa">
                              <v-col class="col-register" cols="12" sm="6"
                                ><v-radio-group v-model="newtcea.tipotasa">
                                  <v-radio
                                    label="Efectiva"
                                    value="Efectiva"
                                  ></v-radio>
                                  <v-radio
                                    label="Nominal"
                                    value="Nominal"
                                  ></v-radio>
                                </v-radio-group>
                              </v-col>
                              <v-col class="col-register" cols="12" sm="6">
                                <v-text-field
                                  v-model="newtcea.tasa"
                                  type="number"
                                  placeholder="%"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <div v-if="newtcea.tipotasa == 'Nominal'">
                                  <v-subheader
                                    >Periodo de Capitalización</v-subheader
                                  >
                                  <v-select
                                    :items="capitalizacion"
                                    v-model="newtcea.capitalizacion"
                                    placeholder="per. de capitalización"
                                    dense
                                    required
                                    outlined
                                  ></v-select>
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-subheader>Fecha de Descuento:</v-subheader>
                            <v-text-field
                              v-model="newtcea.fechaDescuento"
                              placeholder="dd/mm/aaaa"
                              type="date"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6" class="sectiontcea">
                        <h3 class="text-center">Costes / Gastos Iniciales</h3>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="gastos"
                              v-model="newtcea.gastosIniciales"
                              placeholder="motivo"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="newtcea.valorEfectivoGI"
                              placeholder="gastos iniciales"
                              type="number"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6" class="sectiontcea">
                        <h3 class="text-center">Costes / Gastos Finales</h3>
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="gastos"
                              v-model="newtcea.gastosFinales"
                              placeholder="motivo"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="newtcea.valorEfectivoGF"
                              placeholder="gastos finales"
                              type="number"
                              dense
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>

                    <div class="text-center mt-12">
                      <v-btn color="primary" x-large type="submit"
                        >Calcular</v-btn
                      >
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-title>
      <v-divider light></v-divider>
      <v-data-table
        v-if="id > 0"
        :headers="headers"
        :items="items"
        :search="search"
        hide-default-footer
        items-per-page="50"
      >
        <template #item.tcea="{ item }">
          <div v-if="item.tcea == 0">
            <v-btn outlined small color="primary" @click.stop="getdata(item.id)"
              >Calcular</v-btn
            >
          </div>
          <div v-else>
            <a @click.stop="getresults(item.id)">{{ item.tcea }}</a>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import Navbar from "../components/Navbar.vue";
import moment from "moment";

let db = firebase.database();
let recibosRef = db.ref("recibos");
let resultsRef = db.ref("resultados");
let keysRef = db.ref("claves");
export default {
  name: "Recibos",
  components: {
    Navbar,
  },

  firebase: {
    recibos: recibosRef,
    results: resultsRef,
    keysx: keysRef,
  },
  data() {
    return {
      totalfacturado: "hola",
      search: "",
      headers: [
        { text: " # ", value: "id" },
        { text: "Documento", value: "ruc" },
        { text: "Nombres", value: "empresa" },
        { text: "Fecha de Emisión", value: "emision" },
        { text: "Fecha de Pago", value: "fechapago" },
        { text: "Tipo de Moneda", value: "kindOfMoney" },
        { text: "Total a Recibir", value: "monto" },
        { text: "TCEA (%)", value: "tcea" },
      ],

      butid: 0,
      items: [],
      id: 0,
      id2: 0,
      notcea: 0,
      error: "",
      editedIndex: -1,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      keys: {
        id: 0,
        key: "",
      },
      newtcea: {
        reciboid: "",
        dias: "",
        plazo: "",
        tipotasa: "",
        tasa: "",
        fechaDescuento: "",
        gastosIniciales: "",
        valorEfectivoGI: "",
        gastosFinales: "",
        valorEfectivoGF: "",
        emision: "",
        monto: "",
        fechapago: "",
        capitalizacion: "",
        tea: "",
        nd: "",
        te: "",
        d: "",
        _d: "",
        rt: "",
        ci: "",
        vnet: "",
        vr: "",
        cf: "",
        ve: "",
        tcea: 0,
      },
      newRecibo: {
        userid: 0,
        id: 0,
        ruc: "",
        empresa: "",
        emision: "",
        fechapago: "",
        monto: "",
        kindOfMoney: "",
        retencion: "",
        tcea: 0,
      },
      // V-SELECT TCEA
      days: [360, 365],
      plazo: [
        "Diario",
        "Quincenal",
        "Mensual",
        "Bimestral",
        "Trimestral",
        "Cuatrimestral",
        "Semestral",
        "Anual",
      ],
      gastos: [
        "Portes",
        "Fotocopias",
        "Gastos de administración",
        "Gastos notariales",
        "Gastos registrales",
        "Seguro",
        "Otros gastos",
      ],
      capitalizacion: [
        "Diario",
        "Quincenal",
        "Mensual",
        "Bimestral",
        "Trimestral",
        "Cuatrimestral",
        "Semestral",
        "Anual",
      ],
    };
  },
  created() {
    this.initialize();
  },

  methods: {
    xd() {
      this.dialog4 = true;
      console.log("recibo id :", this.newtcea.reciboid);
    },
    initialize: function () {
      recibosRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const recibo = doc.val();
          if (recibo.userid == firebase.auth().currentUser.uid) {
            this.items.push(recibo);
            this.tcea = recibo.tcea;
            this.id = recibo.id;
            console.log(this.tcea);
            this.numitems = recibo.id;
          } else {
            console.log("ID : ", recibo.userid);
            console.log("UID : ", firebase.auth().currentUser.uid);
            console.log("next");
          }
        });
      });
    },

    closerecibos() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newRecibo = Object.assign({});
      });
    },

    closetcea() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.newtcea = Object.assign({});
      });
    },

    closeresults() {
      location.reload();
    },
    addRecibo() {
      this.error = "";
      if (
        this.newRecibo.ruc &&
        this.newRecibo.empresa &&
        this.newRecibo.emision &&
        this.newRecibo.fechapago &&
        this.newRecibo.monto &&
        this.newRecibo.retencion &&
        this.newRecibo.kindOfMoney
      ) {
        //ACTUALIZAR ID
        this.newRecibo.id = this.id + 1;
        this.id = this.id + 1;

        //ASIGNAR ID DE USUARIO
        this.newRecibo.userid = firebase.auth().currentUser.uid;
        console.log("USER ID : ", this.newRecibo.userid);

        //TCEA = 0 PARA QUE APAREZCA EL BOTÓN CALCULAR
        this.newRecibo.tcea = 0;
        this.buttonid = this.newRecibo.id;
        console.log(this.buttonid);
        //GUARDANDO KEY DE CADA ITEM
        this.keys.id = this.newRecibo.id;
        this.keys.key = recibosRef.push(this.newRecibo).getKey();
        keysRef.push(this.keys);
        console.log(this.keys);
        this.items.push(this.newRecibo);
        //MANDAR EMISION, FECHA DE PAGO Y MONTO A DATABASE TCEA
        this.newRecibo.tceaID = this.newRecibo.id;

        this.closerecibos();
      } else {
        this.error = "Todos los campos son requeridos.";
      }
    },

    getdata: function (btnid) {
      console.log(btnid);
      this.butid = btnid;
      this.newtcea.reciboid = this.items[btnid - 1].id;
      this.newtcea.emision = this.items[btnid - 1].emision;
      this.newtcea.fechapago = this.items[btnid - 1].fechapago;
      this.newtcea.monto = this.items[btnid - 1].monto;
      this.newtcea.retencion = this.items[btnid - 1].retencion;
      console.log("emision: ", this.items[btnid - 1].emision);
      console.log("fecha de pago: ", this.items[btnid - 1].fechapago);
      console.log("monto: ", this.items[btnid - 1].monto);
      console.log("retencion: ", this.items[btnid - 1].retencion);
      this.dialog2 = true;
    },

    getresults: function (btnid) {
      console.log(btnid);
      this.butid = btnid;
      recibosRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const recibo = doc.val();
          if (recibo.userid == firebase.auth().currentUser.uid) {
            resultsRef.get().then((snap) => {
              snap.forEach((data) => {
                const result = data.val();
                if (result.reciboid == this.butid) {
                  this.newtcea.tea = result.tea;
                  this.newtcea.nd = result.nd;
                  this.newtcea.te = result.te;
                  this.newtcea.d = result.d;
                  this.newtcea._d = result._d;
                  this.newtcea.rt = result.rt;
                  this.newtcea.ci = result.ci;
                  this.newtcea.vnet = result.vnet;
                  this.newtcea.vr = result.vr;
                  this.newtcea.cf = result.cf;
                  this.newtcea.ve = result.ve;
                  this.newtcea.tcea = result.tcea;
                  this.newtcea.retencion = result.retencion;
                  this.newtcea.reciboid = result.reciboid;

                  console.log(this.newtcea);
                }
              });
            });
          }
        });
      });
      this.dialog4 = true;
    },

    calculateTCEA: function (
      fechapago,
      fechadescuento,
      plazo,
      tasa,
      tipotasa,
      capitalizacion,
      dias,
      monto,
      cgi,
      cgf,
      retencion
    ) {
      console.log("Fecha de pago: ", fechapago);
      console.log("Fecha de descuento: ", fechadescuento);
      console.log("Plazo: ", plazo);
      console.log("Tasa: ", tasa);
      console.log("Tipo de tasa: ", tipotasa);
      console.log("Capitalización: ", capitalizacion);
      console.log("Días: ", dias);
      console.log("Monto: ", monto);
      console.log("CGI: ", cgi);
      console.log("CGF: ", cgf);

      console.log("__________");
      /* Dias por año */
      let diasporaño = parseInt(dias);
      console.log("diasporaño: ", dias);
      /* Tiempo de Descuento */
      let fechaPago = moment(fechapago, "YYYY/MM/DD");
      let fechaDescuento = moment(fechadescuento, "YYYY/MM/DD");
      let fechaDiferencia = parseInt(fechaPago.diff(fechaDescuento, "days"));
      let td = fechaDiferencia; //fechapago - fechadescuento;
      console.log("fechaPago: ", fechaPago);
      console.log("FechaDescuento: ", fechaDescuento);
      console.log("Fecha Diferencia: ", fechaDiferencia);
      console.log("td: ", td);

      let cap = Number;
      switch (capitalizacion) {
        case "Diario":
          cap = 1 / 30;
          break;
        case "Quincenal":
          cap = 1 / 2;
          break;
        case "Mensual":
          cap = 1;
          break;
        case "Bimestral":
          cap = 2;
          break;
        case "Trimestral":
          cap = 3;
          break;
        case "Cuatrimestral":
          cap = 4;
          break;
        case "Semestral":
          cap = 6;
          break;
        case "Anual":
          cap = 12;
          break;

        default:
          cap = 12;
          break;
      }
      console.log("cap: ", cap);

      let plaz = Number;
      switch (plazo) {
        case "Diario":
          plaz = 1 / 30;
          break;
        case "Quincenal":
          plaz = 1 / 2;
          break;
        case "Mensual":
          plaz = 1;
          break;
        case "Bimestral":
          plaz = 2;
          break;
        case "Trimestral":
          plaz = 3;
          break;
        case "Cuatrimestral":
          plaz = 4;
          break;
        case "Semestral":
          plaz = 6;
          break;
        case "Anual":
          plaz = 12;
          break;

        default:
          plaz = 12;
          break;
      }
      console.log("Plaz: ", plaz);
      console.log("cap: ", cap);
      /* Tasa Efectiva para un plazo */
      let te = Number;
      if (tipotasa == "Efectiva") {
        //Para Tasa Efectiva
        te = Math.pow(1 + parseFloat(tasa) / 100, td / (plaz * 30)) - 1;
      } else {
        te =
          Math.pow(
            1 + parseFloat(tasa) / 100 / ((plaz * 30) / (cap * 30)),
            td / (cap * 30)
          ) - 1;
      }
      console.log("te: ", te);

      let re = parseFloat(retencion);
      /* Descuento */
      let tasadcto = te / (1 + te);
      let dcto = parseFloat(monto) * tasadcto;
      console.log("tasadcto: ", tasadcto);
      /* Total costo inicial */
      let tci = parseFloat(cgi);
      console.log("tci: ", tci);
      /* Total costo final */
      let tcf = parseFloat(cgf);
      console.log("tcf: ", tcf);
      /* Valor neto */
      let vn = parseFloat(monto) - dcto;
      console.log("vn: ", vn);
      /* Valor recibido */
      let vr = vn - tci - re;
      console.log("vr: ", vr);
      /* Valor entregado */
      let ve = parseFloat(monto) + tcf - re;
      console.log("ve: ", ve);
      /* TCEA */
      let tcea = (Math.pow(ve / vr, diasporaño / td) - 1) * 100;
      console.log("tcea: ", tcea);

      this.newtcea.tea = tasa;
      this.newtcea.ci = tci;
      this.newtcea.nd = td;
      this.newtcea.vnet = vn;
      this.newtcea.te = te * 100;
      this.newtcea.vr = vr;
      this.newtcea.d = tasadcto * 100;
      this.newtcea.cf = tcf;
      this.newtcea._d = dcto;
      this.newtcea.ve = ve;
      this.newtcea.rt = re;
      this.newtcea.tcea = tcea;
      return tcea;
    },

    showTCEA() {
      this.error = "";

      if (
        this.newtcea.dias &&
        this.newtcea.plazo &&
        this.newtcea.tipotasa &&
        this.newtcea.tasa &&
        this.newtcea.fechaDescuento &&
        this.newtcea.gastosIniciales &&
        this.newtcea.valorEfectivoGI &&
        this.newtcea.gastosFinales &&
        this.newtcea.valorEfectivoGF
      ) {
        let tceafinal = this.calculateTCEA(
          this.newtcea.fechapago,
          this.newtcea.fechaDescuento,
          this.newtcea.plazo,
          this.newtcea.tasa,
          this.newtcea.tipotasa,
          this.newtcea.capitalizacion,
          this.newtcea.dias,
          this.newtcea.monto,
          this.newtcea.valorEfectivoGI,
          this.newtcea.valorEfectivoGF,
          this.newtcea.retencion
        );
        resultsRef.push(this.newtcea);

        recibosRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            const recibo = doc.val();
            if (recibo.userid == firebase.auth().currentUser.uid) {
              if (recibo.id == this.butid) {
                console.log("recibo id: ", recibo.id);
                console.log("button id: ", this.butid);
                console.log(this.keys);
                keysRef.get().then((snap) => {
                  snap.forEach((data) => {
                    const key = data.val();
                    if (key.id == this.butid) {
                      firebase
                        .database()
                        .ref("recibos/" + "key.key")
                        .update({
                          tcea: tceafinal,
                        });
                      console.log("paso: key: ", key.id, "butid: ", this.butid);
                    }
                  });
                });
              }
            }
          });
        });
        this.dialog2 = false;
        this.dialog3 = true;
      } else {
        this.error = "Todos los campos son requeridos.";
      }
    },
  },
};
</script>

<style scoped>
.recibos-card {
  padding: 20px;
  margin: 100px;
}

.wallet-card {
  padding: 20px;
  margin: auto;
  width: 50%;
}

.col-register {
  padding-block: 0px;
}

.card-dialog {
  width: 100vh;
  padding: 5%;
}

.tcea-dialog {
  width: 100vh;
  padding: 3%;
}

.results-dialog {
  width: 100vh;
  padding: 5%;
}
.sectiontcea {
  border: rgb(255, 255, 255) 1px solid;
  background-color: rgb(247, 247, 247);
}

.formtasa {
  text-align: end;
  align-items: flex-end;
}

.switch-toggle {
  position: absolute;
  display: flex;
  left: 80%;
}

.SOLES {
  font-size: 15px;
}
</style>
