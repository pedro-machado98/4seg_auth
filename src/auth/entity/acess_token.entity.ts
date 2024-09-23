import { ApiProperty } from "@nestjs/swagger";

export class access_token {
    @ApiProperty({
        type: String,
        description: 'Obrigatorio',
      })
    access_token: String
}