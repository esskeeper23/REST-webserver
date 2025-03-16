import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";




( async () => {
    main();
})();



function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: 'public',
        routes: AppRoutes.routes,
    });

    server.start();
}