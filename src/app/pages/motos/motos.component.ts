import { Component, OnInit } from '@angular/core';
import { MotoService } from '../.././services/moto.service';
import { Moto } from '../.././models/moto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.css']
})
export class MotosComponent implements OnInit {

  moto = {} as Moto;
  motos: Moto[];

  constructor(private motoService: MotoService) {}
  
  ngOnInit() {
    this.getMotos();
  }

  // defini se uma moto será criado ou atualizado
  saveMoto(form: NgForm) {
    if (this.moto.id !== undefined) {
      this.motoService.updateMoto(this.moto).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.motoService.saveMoto(this.moto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos as motos
  getMotos() {
    this.motoService.getMotos().subscribe((motos: Moto[]) => {
      this.motos = motos;
    });
  }

  // deleta uma moto
  deleteMoto(moto: Moto) {
    this.motoService.deleteMoto(moto).subscribe(() => {
      this.getMotos();
    });
  }

  // copia a moto para ser editado.
  editMoto(moto: Moto) {
    this.moto = { ...moto };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getMotos();
    form.resetForm();
    this.moto = {} as Moto;
  }

}
