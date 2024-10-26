import { UserRepositoryImpl } from "./repository/userRepository";
import { UserController } from "../application/controller/userController";
import { UserInterceptor } from "./httpInterceptors/userInterceptor";
import { UserService } from "../domain/services/userService";
import { UserServiceImpl } from "./services/userService";
import { TokenServiceImpl } from "./services/tokenService";

export const userInterceptor = async () => {

    const userRepository = new UserRepositoryImpl() // Se crea la implementacion del repositorio
    const userServiceImpl = new UserServiceImpl() // Se crea el servicio y se le inyecta el repositorio para que use sus metodos sin conocer implementacion
    const tokenServiceImpl = new TokenServiceImpl() // Se crea el servicio y se le inyecta el repositorio para que use sus metodos sin conocer implementacion
    const userService = new UserService(userRepository, userServiceImpl) // Se crea el servicio y se le inyecta el repositorio para que use sus metodos sin conocer implementacion
    const userController = new UserController(userService, tokenServiceImpl) // Se crea el controlador y se le inyectan los servicios del dominio para controlar el caso de uso
    return new UserInterceptor(userController) // Creamos el interceptor y le pasamos la instancia del controlador para que utilice sus metodos segun el endpoint

}