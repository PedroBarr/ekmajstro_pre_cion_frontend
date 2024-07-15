export class PrevisualizacionEntrada {

  public tipo_entrada: 'ANUNCIO' | 'PREVISUALIZACION' | undefined;
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
  public anun_id: string;

  constructor (obj: any = {}) {
    const {
      imagen = '',
      enlace = '/',
      anun_id = '',
    } = obj;

    super(obj);

    this.tipo_entrada = 'ANUNCIO';
    this.imagen = imagen;
    this.enlace = enlace;
    this.anun_id = anun_id;
  }

  override ruta_enlace ( ): string {
    return this.enlace;
  }

  override get_id ( ): string {
    return this.anun_id;
  }

}

export class PrevisualizacionPrevisualizacion extends PrevisualizacionEntrada {

  public imagen: string;
  public resumen: string;
  public descripcion: string;
  public enlace: string;
  public publicacion_id: string;
  public titulo: string;
  public etiquetas: any[];
  public tipos_recurso: any[];

  constructor (obj: any = {}) {
    const {
      imagen = '',
      resumen = '',
      descripcion = '',
      enlace = '/',
      publicacion_id = '',
      titulo = '',
      etiquetas = [],
      tipos_recurso = [],
    } = obj;

    super(obj);

    this.tipo_entrada = 'PREVISUALIZACION';
    this.imagen = imagen;
    this.resumen = resumen;
    this.descripcion = descripcion;
    this.enlace = enlace;
    this.publicacion_id = publicacion_id;
    this.titulo = titulo;
    this.etiquetas = etiquetas;
    this.tipos_recurso = tipos_recurso;
  }

  override ruta_enlace ( ): string {
    return this.enlace;
  }

  override get_id ( ): string {
    return this.publicacion_id;
  }

}