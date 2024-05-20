import threading
import time


semaphore = threading.Semaphore(1)


def tarea(id):
    
    print(f"Producto {id} intentando acceder a la base")
    with semaphore:
        print(f"Producto {id} ha adquirido los datos")
        time.sleep(2)
        print(f"Producto {id} ha liberado los datos")

threads = []
for i in range(5):
    thread = threading.Thread(target=tarea, args=(i,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

