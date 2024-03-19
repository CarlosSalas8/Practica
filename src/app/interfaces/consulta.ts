export interface Consulta {
    cedula: string;
    fechaIngreso: string;
    fechaUltima: string;
    historial: string;
    nombres: string;
    nombre: string;

    // Propiedades específicas de la colección de Consulta
    mujer?: string;
    enfermedades?: string;
    hipotirodismo?: string;
    diabetes?: number;
    cronica?: number;
    cancer?: number;
    dislipidemias?: string;
    personales?: string;
    valoracion?: string;
    cie10?: string[];
    otrosSelect?: string;

    // Propiedad compartidas con la colección de Consulta y Usuario
    otros?: string;

    // Propiedades compartidas con la colección de Enfermería
    peso?: number;
    talla?: number;
    cintura?: number;
    presion?: string;

    // Propiedades compartidas con la colección de Usuario
    atencion?: string;
    afiliacion?: string;
    sexo?: string;
    edad?: number;
    fechaNacimiento?: Date;
    estado?: string;
    laboral?: string;
    parroquia?: string;
    calles?: string;
    numcasa?: string;
    telefono?: number;
    mail?: string;
    escolaridad?: string;
    institucion?: string;
    ocupacion?: string;
    guia?: string;
    alimentacion?: string;
    fumar?: string;
    sustancias?: string;
    ejercicio?: string;
    alcoholismo?: string;
    antecedentes?: string;
    patologia?: string;
    tiroidea?: string;
    sobrepeso?: string;
}


