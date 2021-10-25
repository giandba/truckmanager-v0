/*
Icons: https://icons.getbootstrap.com/icons/truck/
*/
import { defineComponent } from "vue";
import axios from 'axios';
import { TruckModel } from '../../Models/TruckModel'
import ApiReponseResult from '../../Models/ApiReponseResult'

export default defineComponent({
    data() {
        console.log('data');

        return {
            listSearchText: "",
            actionPageAlertMessage: "",
            actionPageShowAlertError: false,
            actionPageShowAlertOk: false,
            actionPage: "list",
            truckList: [],
            truckListFiltered: [],
            truckAdd: {},
            truckEdit: {},
        }
    },
    created() {
        console.log('created');
        this.load();
    },
    setup() {
        const truckManagerUrl = "https://localhost:44368/api/truck";

        return {
            truckManagerUrl
        };
    },
    methods: {
        load() {
            console.log('load');
            this.actionPageAlertMessage = "";
            this.actionPage = "list";
            this.list();
        },
        showAlertHide() {
            this.actionPageAlertMessage = "text";
            this.actionPageShowAlertError = false;
            this.actionPageShowAlertOk = false;
        },
        showAlertOk(text: string) {
            this.actionPageAlertMessage = text;
            this.actionPageShowAlertError = false;
            this.actionPageShowAlertOk = true;
            window.setTimeout(() => {
                this.showAlertHide();
            }, 3000);
        },
        showAlertError(text: string) {
            this.actionPageAlertMessage = text;
            this.actionPageShowAlertError = true;
            this.actionPageShowAlertOk = false;
            window.setTimeout(() => {
                this.showAlertHide();
            }, 3000);
        },
        list() {
            this.actionPage = "list";

            axios.get(this.truckManagerUrl)
                .then((responseAxios) => {
                    var response = responseAxios.data;
                    if (!response.status) {
                        this.showAlertError("Erro ao consultar dados");
                        return;
                    }

                    this.truckList = response.data;
                    //Filtro
                    if (this.listSearchText.length > 0) {
                        let searching = this.listSearchText.toString();
                        this.truckListFiltered = this.truckList.filter((item: TruckModel) => {
                            return item.name.indexOf(searching) >= 0;
                        });
                    } else {
                        this.truckListFiltered = this.truckList;
                    }

                    this.actionPage = "list";
                });
        },
        itemAddOpen() {
            this.actionPage = "add";
            this.truckAdd = {
                id: 0,
                name: "",
                modelType: 0,
                manufactureYear: (new Date()).getFullYear(),
                modelYear: (new Date()).getFullYear()
            };

        },
        itemAddSave() {
            try {
                let dataSent = {
                    id: 0,
                    name: this.truckAdd.name,
                    modelType: Number(this.truckAdd.modelType),
                    manufactureYear: Number(this.truckAdd.manufactureYear),
                    modelYear: Number(this.truckAdd.modelYear),
                };
                console.log('post', this.truckManagerUrl, dataSent);
                
                axios.post(this.truckManagerUrl, dataSent)
                    .then((responseAxios) => {
                        console.log('post ok');
                        this.showAlertOk("Caminhão criado com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.error('post catch', err);
                        this.showAlertOk("Não foi possivel criar");
                    });
            } catch (error) {
                console.error('post', error);
                this.showAlertOk("Não foi possivel criar!");
            }
        },
        itemEditOpen(truckItem: TruckModel) {
            this.actionPage = "edit";
            //Implementar o GET por ID
            try {
                axios.get(this.truckManagerUrl + "/" + truckItem.id)
                    .then((responseAxios: any) => {
                        var response = responseAxios.data;
                        if (!response.status) {
                            this.showAlertError("Erro ao consultar dados");
                            return;
                        }

                        this.truckEdit = new TruckModel();
                        this.truckEdit.id = response.data.id;
                        this.truckEdit.name = response.data.name;
                        this.truckEdit.modelType = response.data.modelType;
                        this.truckEdit.manufactureYear = response.data.manufactureYear;
                        this.truckEdit.modelYear = response.data.modelYear;
                    }).catch((err) => {
                        console.log('get edit catch',err);
                        this.showAlertOk("Não foi possivel carregar");
                        this.load();
                    });
            } catch (error) {
                console.error('get edit', error);
                this.showAlertOk("Não foi possivel carregar!");
            }
        },
        itemEditSave() {
            try {
                let dataSent = {
                    id: Number(this.truckEdit.id),
                    name: this.truckEdit.name,
                    modelType: Number(this.truckEdit.modelType),
                    manufactureYear: Number(this.truckEdit.manufactureYear),
                    modelYear: Number(this.truckEdit.modelYear),
                };
                console.log('put', this.truckManagerUrl, dataSent);
                axios.put(this.truckManagerUrl, dataSent)
                    .then((responseAxios) => {
                        console.log('put ok');
                        this.showAlertOk("Caminhão alterado com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.log('put catch', err);
                        this.showAlertOk("Não foi possivel alterar");
                    });
            } catch (error) {
                console.error('put', error);
                this.showAlertOk("Não foi possivel alterar!");
            }
        },
        itemDelete(truckid: number) {
            try {
                axios.delete(this.truckManagerUrl + "/" + truckid)
                    .then((responseAxios) => {
                        console.log('delete ok');
                        this.showAlertOk("Caminhão excluído com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.log('delete catch', err);
                        this.showAlertOk("Não foi possivel excluir");
                    });
            } catch (error) {
                console.error('delete', error);
                this.showAlertOk("Não foi possivel excluir!");
            }
        },
    }
});