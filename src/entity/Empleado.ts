import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Comuna } from "./Comuna"
import { Marca } from "./Marca"
import { Sucursal } from "./Sucursal"
import * as bcrypt from 'bcryptjs'

@Entity()
export class Empleado {

    @PrimaryGeneratedColumn()
    Rut_Empleado: string

    @Column()
    @IsNotEmpty()
    Codigo_Comuna: string

    @Column()
    @IsNotEmpty()
    Codigo_Sucursal: string

    @Column()
    @IsNotEmpty()
    Nombres: string

    @Column()
    @IsNotEmpty()
    Apellido_Paterno: string

    @Column()
    @IsNotEmpty()
    Apellido_Materno: string

    @Column()
    @IsNotEmpty()
    Telefono_Empleado: number

    @Column()
    @IsNotEmpty()
    Cargo: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    Email_Empleado: string

    @Column()
    @IsNotEmpty()
    Direccion_Empleado: string

    @Column()
    @IsNotEmpty()
    Estado: string

    @Column()
    @IsNotEmpty()
    Clave: string

    @Column()
    @IsNotEmpty()
    Privilegio: string

    @ManyToMany(() => Sucursal, (sucursal) => sucursal.Codigo_Sucursal,{
        onDelete:"CASCADE"
    })
    sucursales : Sucursal[]

    @ManyToOne(() => Comuna, (comuna) => comuna.empleado, {
        onDelete:"CASCADE"
    })
    @JoinColumn( { name: 'Codigo_Comuna' } )
    comuna:Comuna

    @OneToMany(() => Marca, (marca) => marca.empleado, {
        cascade: true,
        onDelete:"CASCADE"
    })
    marca:Marca[]
    empleado:Empleado

    hashPassword():void{
        const salt=bcrypt.genSaltSync(12);
        this.Clave=bcrypt.hashSync(this.Clave,salt)
    }
    checkPassword(Clave:string):boolean{
        return bcrypt.compareSync(Clave,this.Clave)
    }

}
