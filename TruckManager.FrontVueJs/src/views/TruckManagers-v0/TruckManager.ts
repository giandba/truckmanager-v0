/*
Icons: https://icons.getbootstrap.com/icons/truck/
*/
import { defineComponent } from "vue";
import axios from 'axios';
import { TruckModel } from '../../Models/TruckModel'
import ApiReponseResult from '../../Models/ApiReponseResult'

export class PageModel {
    listSearchText: String = "";
    actionPageAlertMessage: String = "";
    actionPageShowAlertError: Boolean = false;
    actionPageShowAlertOk: Boolean = false;
    actionPage: String = "list";
    truckList: TruckModel[] = <TruckModel[]>[];
    truckListFiltered: TruckModel[] = <TruckModel[]>[];
    truckAdd: TruckModel = new TruckModel();
    truckEdit: TruckModel = new TruckModel();
}

export default defineComponent({
    data() {
        console.log('data');
        page: PageModel;

        return {
            page: new PageModel()
        }
    },
    watch: {
        page: function (data) {
            console.log(data);
        }
    },
    created() {
        console.log('created');
        this.load();
    },
    setup() {
        const truckManagerUrl = "https://localhost:44368/api/truck/";

        return {
            truckManagerUrl,
            // listSearchText: "",
            // actionPageAlertMessage: "",
            // actionPageShowAlertError: false,
            // actionPageShowAlertOk: false,
            // actionPage: "list"
        };
    },
    methods: {
        load() {
            console.log('load');
            this.page.actionPageAlertMessage = "";
            this.page.actionPage = "list";
            this.list();
        },
        showAlertHide() {
            this.page.actionPageAlertMessage = "text";
            this.page.actionPageShowAlertError = false;
            this.page.actionPageShowAlertOk = false;
        },
        showAlertOk(text: string) {
            this.page.actionPageAlertMessage = text;
            this.page.actionPageShowAlertError = false;
            this.page.actionPageShowAlertOk = true;
            window.setTimeout(() => {
                this.showAlertHide();
            }, 3000);
        },
        showAlertError(text: string) {
            this.page.actionPageAlertMessage = text;
            this.page.actionPageShowAlertError = true;
            this.page.actionPageShowAlertOk = false;
            window.setTimeout(() => {
                this.showAlertHide();
            }, 3000);
        },
        list() {
            this.page.actionPage = "list";

            axios.get<ApiReponseResult<Array<TruckModel>>>(this.truckManagerUrl)
                .then((responseAxios) => {
                    var response = responseAxios.data;
                    if (!response.status) {
                        this.showAlertError("Erro ao consultar dados");
                        return;
                    }

                    this.page.truckList = response.data;
                    //Filtro
                    if (this.page.listSearchText.length > 0) {
                        let searching = this.page.listSearchText.toString();
                        this.page.truckListFiltered = this.page.truckList.filter((item: TruckModel) => {
                            console.log(item.name, item.name.indexOf(searching));
                            return item.name.indexOf(searching) >= 0;
                        });
                    } else {
                        this.page.truckListFiltered = this.page.truckList;
                    }

                    this.page.actionPage = "list";
                });
        },
        itemAddOpen() {
            this.page.actionPage = "add";
            this.page.truckAdd = {
                id: 0,
                name: "",
                modelType: 0,
                manufactureYear: (new Date()).getFullYear(),
                modelYear: (new Date()).getFullYear()
            };

        },
        itemAddSave() {
            console.log(this.page.truckAdd);
            debugger;
            try {
                axios.post(this.truckManagerUrl, this.page.truckAdd)
                    .then((responseAxios) => {
                        debugger;
                        this.showAlertOk("Caminhão criado com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.error(err);
                        debugger;
                        this.showAlertOk("Não foi possivel criar");
                        this.load();
                    });
            } catch (error) {
                console.error(error);
                this.showAlertOk("Não foi possivel criar!");
                debugger;
            }
        },
        itemEditOpen(truckItem: TruckModel) {
            this.page.actionPage = "edit";
            //Implementar o GET por ID
            try {
                axios.get(this.truckManagerUrl + truckItem.id)
                    .then((responseAxios: any) => {
                        var response = responseAxios.data;
                        if (!response.status) {
                            this.showAlertError("Erro ao consultar dados");
                            return;
                        }

                        this.page.truckEdit = new TruckModel();
                        this.page.truckEdit.id = response.data.id;
                        this.page.truckEdit.name = response.data.name;
                        this.page.truckEdit.modelType = response.data.modelType;
                        this.page.truckEdit.manufactureYear = response.data.manufactureYear;
                        this.page.truckEdit.modelYear = response.data.modelYear;

                        console.log(this.page.truckEdit);
                    }).catch((err) => {
                        console.log(err);
                        this.showAlertOk("Não foi possivel carregar");
                        this.load();
                    });
            } catch (error) {
                console.error(error);
                this.showAlertOk("Não foi possivel carregar!");
                debugger;
            }
        },
        itemEditSave() {
            try {
                axios.put(this.truckManagerUrl, this.page.truckEdit)
                    .then((responseAxios) => {
                        this.showAlertOk("Caminhão alterado com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.log(err);
                        this.showAlertOk("Não foi possivel alterar");
                        this.load();
                    });
            } catch (error) {
                console.error(error);
                this.showAlertOk("Não foi possivel alterar!");
                debugger;
            }
        },
        itemDelete(truckid: number) {
            try {
                axios.delete(this.truckManagerUrl + truckid)
                    .then((responseAxios) => {
                        this.showAlertOk("Caminhão excluído com sucesso");
                        this.load();
                    }).catch((err) => {
                        console.log(err);
                        this.showAlertOk("Não foi possivel excluir");
                        this.load();
                    });
            } catch (error) {
                console.error(error);
                this.showAlertOk("Não foi possivel excluir!");
                debugger;
            }
        },
    }
});