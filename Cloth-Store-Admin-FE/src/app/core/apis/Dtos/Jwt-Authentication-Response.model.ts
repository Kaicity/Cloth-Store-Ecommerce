import {DatePipe} from "@angular/common";

export class JwtAuthenticationResponseModel{
  token!: string | null;
  refreshToken!: string | null;
  timeStart!: DatePipe | null;
  timeEnd! : DatePipe | null;
}
