import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { selectorden } from '../interfaces/orders.interfaces';
import * as XLSX from 'xlsx';
import { NewoperationsService } from 'src/app/services/newoperations.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  stockfinal = 0;
  stockfinal2 = 0;
  user = localStorage.getItem('name_user');
  ordersselect: selectorden[] = [];
  ordersselectlami: selectorden[] = [];
  ordersselectcortedisco: selectorden[] = [];
  ordersselectcorterebobinado: selectorden[] = [];
  ordersselecttroquelado: selectorden[] = [];
  ordersselectcortetwo: selectorden[] = [];
  ordersselectsuajetwo: selectorden[] = [];
  fileName = 'Orden-Produccion.xlsx';
  fileName2 = 'Bitacora-Corte.xlsx';
  fileName3 = 'Bitacora-Suaje.xlsx';
  fileName4 = 'Bitacora-Laminado.xlsx';
  fileName5 = 'Bitacora-Inspeccion-Corte.xlsx';
  fileName7 = 'Bitacora-Control-Calidad.xlsx';
  fileName6 = 'Bitacora-Liberacion.xlsx';
  fileName8 = 'Bitacora-Lista-de-Inspeccion.xlsx';
  fileName9 = 'Bitacora-Corte-con-Disco.xlsx';
  fileName10 = 'Bitacora-Corte-y-Rebobinado.xlsx';
  fileName11 = 'Bitacora-Troquelado.xlsx';
  fileName20 = 'Bitacora-Corte-OS.xlsx';
  fileName21 = 'Bitacora-Suaje-OS.xlsx';
  num = 0;
  num2 = 0;
  num3 = 0;
  num4 = 0;
  num5 = 0;
  num6 = 0;
  num7 = 0;
  num8 = 0;
  num9 = 0;
  num10 = 0;
  num11 = 0;
  num20 = 0;
  num21 = 0;
  exito = 0;
  exito2 = 0;
  exito3 = 0;
  //opcion:String='bitacoras1';
  opcion = localStorage.getItem('opcion');

  constructor(
    public service: AuthService,
    public clientesServices: AuthService,
    public operations: NewoperationsService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
    this.service.getdownloadSelect().subscribe((res) => {
      this.ordersselect = res;
      //console.log(res);
    });

    this.service.getdownloadSelectlami().subscribe((res) => {
      this.ordersselectlami = res;
      //console.log(res);
    });

    this.service.getdownloadCorteDisco().subscribe((res) => {
      this.ordersselectcortedisco = res;
      //console.log(res);
    });
    this.service.getdownloadCorteRebobinado().subscribe((res) => {
      this.ordersselectcorterebobinado = res;
      //console.log(res);
    });
    this.service.getdownloadTroquelado().subscribe((res) => {
      this.ordersselecttroquelado = res;
      //console.log(res);
    });
    this.service.getdownloadcortetwo().subscribe((res) => {
      this.ordersselectcortetwo = res;
      //console.log(res);
    });
    this.service.getdownloadsuajetwo().subscribe((res) => {
      this.ordersselectsuajetwo = res;
      //console.log(res);
    });

    if (this.user == 'Administrador' && this.opcion == 'bitacoras') {
      this.exito = 1;
      this.exito3 = 1;
    } else if (this.user == 'Administrador' && this.opcion != 'bitacoras') {
      this.exito = 1;
      this.exito2 = 1;
    } else if (this.user != 'Administrador' && this.opcion == 'bitacoras') {
      this.exito = 0;
      this.exito3 = 1;
    } else if (this.user != 'Administrador' && this.opcion != 'bitacoras') {
      this.exito = 0;
      this.exito2 = 1;
    }
  }

  checkData(ordenpro: HTMLSelectElement) {
    this.service.getdownloadOrden(ordenpro.value).subscribe((res) => {
      this.service.ordendepro = res;
    });
    this.service
      .getdownloadOrdenCalculations(ordenpro.value)
      .subscribe((res) => {
        this.service.ordendeproCal = res;
      });
    this.num = 1;
  }

  getBitCorte(ordenpro2: HTMLSelectElement) {
    this.service.getdownloadBitCorte(ordenpro2.value).subscribe((res) => {
      this.service.bitcorte = res;
    });
    this.num2 = 1;
  }

  getBitSuaje(ordenpro3: HTMLSelectElement) {
    this.service.getdownloadBitSuaje(ordenpro3.value).subscribe((res) => {
      this.service.bitsuaje = res;
    });
    this.num3 = 1;
  }

  getBitLami(ordenpro2: HTMLSelectElement) {
    this.service.getdownloadBitLami(ordenpro2.value).subscribe((res) => {
      this.service.bitlami = res;
    });
    this.num4 = 1;
  }

  InspectionCorte(ordenpro5: HTMLSelectElement) {
    this.service.getdownloaInspectionCorte(ordenpro5.value).subscribe((res) => {
      this.service.info = res;
    });

    this.service.getdownloaInspectionpapel(ordenpro5.value).subscribe((res) => {
      this.service.papel = res;
    });

    this.service.getdownloaInspectionfolio(ordenpro5.value).subscribe((res) => {
      this.service.folio = res;
    });

    this.service
      .getdownloaInspectionvigilar(ordenpro5.value)
      .subscribe((res) => {
        this.service.vigilar = res;
      });
    this.num5 = 1;
  }

  Inspection2(ordenpro6: HTMLSelectElement) {
    this.service
      .getdownloaInspectionvigilar2(ordenpro6.value)
      .subscribe((res) => {
        this.service.suaje = res;
      });

    this.service.getdownloaInspection2(ordenpro6.value).subscribe((res) => {
      this.service.info = res;
    });

    this.service.getdownloaInspectionpapel(ordenpro6.value).subscribe((res) => {
      this.service.papel = res;
    });

    this.service.getdownloaInspectionfolio(ordenpro6.value).subscribe((res) => {
      this.service.folio = res;
    });

    this.service.getdownloaInspectionEmp2(ordenpro6.value).subscribe((res) => {
      this.service.empaque = res;
    });

    this.service.getdownloaInspectionlib2(ordenpro6.value).subscribe((res) => {
      this.service.vigilar = res;
    });

    this.service
      .getdownloaInspectionlibSalida2(ordenpro6.value)
      .subscribe((res) => {
        this.service.salida2 = res;
      });

    this.num6 = 1;
  }

  ControlCalidad(ordenpro7: HTMLSelectElement) {
    this.service.getdownloadControl(ordenpro7.value).subscribe((res) => {
      this.service.control = res;
    });

    this.service.getdownloadControlClient(ordenpro7.value).subscribe((res) => {
      this.service.control2 = res;
    });

    this.service.getdownloadSalida(ordenpro7.value).subscribe((res) => {
      this.service.salida = res;
    });

    this.num7 = 1;
  }

  getLista(ordenpro8: HTMLSelectElement) {
    this.service.getList(ordenpro8.value).subscribe((res) => {
      this.service.lista = res;
    });
    this.num8 = 1;
  }

  getcortedisco(ordenpro9: HTMLSelectElement) {
    this.operations.getbitcortedisco(ordenpro9.value).subscribe((res) => {
      this.operations.bitcortedisco = res;
      console.log(res);
    });
    this.num9 = 1;
  }

  getinfocortetwo(ordenpro20: HTMLSelectElement) {
    this.clientesServices
      .getbitcortetwotwo(ordenpro20.value)
      .subscribe((res) => {
        this.clientesServices.infocorte = res;
        console.log(res);
      });
    this.num20 = 1;
  }

  getinfosuajetwo(ordenpro21: HTMLSelectElement) {
    this.clientesServices
      .getbitsuajetwotwo(ordenpro21.value)
      .subscribe((res) => {
        this.clientesServices.infosuaje = res;
        console.log(res);
      });
    this.num21 = 1;
  }

  getrebobinado(ordenpro10: HTMLSelectElement) {
    this.operations.getbitrebobinado(ordenpro10.value).subscribe((res) => {
      this.operations.bitrebobinado = res;
    });
    //console.log(this.clientesServices.infocorte);
    this.num10 = 1;
  }
  gettroquelado(ordenpro11: HTMLSelectElement) {
    this.operations.getbitroquelado(ordenpro11.value).subscribe((res) => {
      this.operations.bitroquelado = res;
    });
    //console.log(this.clientesServices.infocorte);
    this.num11 = 1;
  }

  /////////////DELATES
  delateorden(id_order: number, ordenpro: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrders(id_order).subscribe(
        (res) => {
          this.checkData(ordenpro);
          //this.getinfocorte();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateordencalculations(id: number, ordenpro: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersCalculations(id).subscribe(
        (res) => {
          this.checkData(ordenpro);
          //this.getinfocorte();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfocorte(id_corte: number, ordenpro2: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersCorte(id_corte).subscribe(
        (res) => {
          this.getBitCorte(ordenpro2);
          //this.getinfocorte();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfosuaje(id_suaje: number, ordenpro3: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersSuaje(id_suaje).subscribe(
        (res) => {
          this.getBitSuaje(ordenpro3);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfolami(id_lami: number, ordenpro4: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersLami(id_lami).subscribe(
        (res) => {
          this.getBitLami(ordenpro4);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfomedidas(id: number, ordenpro5: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoInspection1(id).subscribe(
        (res) => {
          this.InspectionCorte(ordenpro5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delatevigilar(id_vigilar: number, ordenpro5: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfovigilar1(id_vigilar).subscribe(
        (res) => {
          this.InspectionCorte(ordenpro5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delatevigilar2(id_vigilar: number, ordenpro6: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfovigilar2(id_vigilar).subscribe(
        (res) => {
          this.Inspection2(ordenpro6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateempaque(id_vigilar: number, ordenpro6: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoempaque(id_vigilar).subscribe(
        (res) => {
          this.Inspection2(ordenpro6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateliberacion(id_vigilar: number, ordenpro6: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoliberacion(id_vigilar).subscribe(
        (res) => {
          this.Inspection2(ordenpro6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delatesalida2(id_salida: number, ordenpro6: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfosalida2(id_salida).subscribe(
        (res) => {
          this.Inspection2(ordenpro6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delatesalida(id_salida: number, ordenpro7: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfosalida(id_salida).subscribe(
        (res) => {
          this.ControlCalidad(ordenpro7);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfoPapel(id_papel: number, ordenpro5: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoPapel(id_papel).subscribe(
        (res) => {
          this.InspectionCorte(ordenpro5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfoFolio(id_folio: number, ordenpro5: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoFolio(id_folio).subscribe(
        (res) => {
          this.InspectionCorte(ordenpro5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfomedidas2(id: number, ordenpro6: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfoInspection2(id).subscribe(
        (res) => {
          this.Inspection2(ordenpro6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfolistinspection(
    id_list_inspection: number,
    ordenpro8: HTMLSelectElement
  ) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateinfolista(id_list_inspection).subscribe(
        (res) => {
          this.getLista(ordenpro8);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    //this.checkAvance();
  }

  delateinfocontrolcalidad(
    id_liberacion: number,
    ordenpro8: HTMLSelectElement
  ) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.service.delateLiberacion(id_liberacion).subscribe(
        (res) => {
          this.ControlCalidad(ordenpro8);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfocortedisco(id_bitcortedisco: number, ordenpro9: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.operations.delatebitcortedisco(id_bitcortedisco).subscribe(
        (res) => {
          this.getcortedisco(ordenpro9);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfocorterebobinado(
    id_bitrebobinado: number,
    ordenpro10: HTMLSelectElement
  ) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.operations.delatebitrebobinado(id_bitrebobinado).subscribe(
        (res) => {
          this.getrebobinado(ordenpro10);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfotroquelado(
    id_bittroqueladora: number,
    ordenpro11: HTMLSelectElement
  ) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.operations.delatebitroquelado(id_bittroqueladora).subscribe(
        (res) => {
          this.gettroquelado(ordenpro11);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfocortetwo(id_corte: number, ordenpro20: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersCortetwo(id_corte).subscribe(
        (res) => {
          this.getinfocortetwo(ordenpro20);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  delateinfosuajetwo(id_suaje: number, ordenpro20: HTMLSelectElement) {
    if (confirm('¿Seguro que quieres Eliminarlo?')) {
      this.clientesServices.delateinfoOrdersSuajetwo(id_suaje).subscribe(
        (res) => {
          this.getinfosuajetwo(ordenpro20);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orden-Produccion');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  exportexcelBitCorte(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Corte');
    /* save to file */
    XLSX.writeFile(wb, this.fileName2);
  }

  exportexcelBitSuaje(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table3');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Suaje');
    /* save to file */
    XLSX.writeFile(wb, this.fileName3);
  }

  exportexcelBitlami(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table4');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Laminado');
    /* save to file */
    XLSX.writeFile(wb, this.fileName4);
  }

  exportexcelInspectionCorte(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table5');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Inspeccion-Corte');
    /* save to file */
    XLSX.writeFile(wb, this.fileName5);
  }

  exportexcelLiberacion(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table6');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Liberacion');
    /* save to file */
    XLSX.writeFile(wb, this.fileName6);
  }

  exportexcelControlCalidad(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table7');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Control-Calidad');
    /* save to file */
    XLSX.writeFile(wb, this.fileName7);
  }

  exportexcellista(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table8');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Lista-de-Inspeccion');
    /* save to file */
    XLSX.writeFile(wb, this.fileName8);
  }

  exportexcelCorteDisco(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table9');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Corte-Disco');
    /* save to file */
    XLSX.writeFile(wb, this.fileName9);
  }

  exportexcelCorteRebobinado(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table10');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Corte-Rebobinado');
    /* save to file */
    XLSX.writeFile(wb, this.fileName10);
  }

  exportexcelTroquelado(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table11');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Troquelado');
    /* save to file */
    XLSX.writeFile(wb, this.fileName11);
  }

  exportexcelCortetwo(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table20');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Corte-OS');
    /* save to file */
    XLSX.writeFile(wb, this.fileName20);
  }

  exportexcelSuajetwo(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table21');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bitacora-Suaje-OS');
    /* save to file */
    XLSX.writeFile(wb, this.fileName21);
  }
}
