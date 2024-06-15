export class PrevisualizacionEntrada {

  public tipo_entrada: 'ANUNCIO' | 'PREVISUALIZCION' | undefined;
  public medida: string;

  constructor (obj: any = {}) {
    const {
      medida = '1x1',
    } = obj;

    this.medida = medida;
  }

  ruta_enlace ( ): string {
    return '/';
  }

  get_id ( ): string {
    return '';
  }

}


export class PrevisualizacionAnuncio extends PrevisualizacionEntrada {

  public imagen: string;
  public enlace: string;

  constructor (obj: any = {}) {
    const {
      imagen = '',
      enlace = '/',
    } = obj;

    super(obj);

    this.tipo_entrada = 'ANUNCIO';
    this.imagen = imagen;
    this.enlace = enlace;
  }

  override ruta_enlace ( ): string {
    return this.enlace;
  }

  override get_id ( ): string {
    return '';
  }

}