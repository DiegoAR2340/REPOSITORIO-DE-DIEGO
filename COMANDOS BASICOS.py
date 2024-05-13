""" Programa que nos permite crear archivos y carpetas"""

import subprocess
import os

print("CREADOR DE ARCHIVOS Y CARPETAS\n")
print("1. CREAR .TXT\n")
print("2. CREAR CARPETA: CALIFICACIONES\n")
print("3. CREAR UNA CARPETA DENTRO DE CALIFICACIONES QUE SE LLAME PRIMER PARCIAL\n")
print("4. MOVER EL ARCHIVO .TXT A LA CARPETA CALIFICACIONES\n")
print("5. MOVER EL ARCHIVO DE LA CALCULADORA A LA CARPETA PRIMER PARCIAL\n")

opcion = input("Ingresa una opcion: ")

def ejecutar (comando):

    subprocess.run(comando,shell=True)

if opcion == "1":

    ejecutar("touch misnotas.txt")

elif opcion == "2":

    ejecutar("mkdir calificaciones")

elif opcion == "3":

    ejecutar("mkdir calificaciones/primer_parcial")

elif opcion == "4":

    ejecutar("mv misnotas.txt calificaciones")

elif opcion == "5":

    ejecutar("mv calculadora.py calificaciones/primer_parcial")


    

      
