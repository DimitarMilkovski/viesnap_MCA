import { MatSnackBarConfig } from '@angular/material/snack-bar'

export const environment: {
    production: boolean
    apiUrl: string
    snackBarConfig: MatSnackBarConfig
} = {
    production: false,
    apiUrl: 'http://jsonplaceholder.typicode.com',
    snackBarConfig: {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 4000,
    },
}