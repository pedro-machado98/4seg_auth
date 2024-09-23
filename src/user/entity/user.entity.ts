import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({
        type: Number,
      })
    id: Number
    @ApiProperty({
        type: Date,
      })
    createdAt: Date
    @ApiProperty({
        type: Date,
      })
    updatedAt: Date
    @ApiProperty({
        type: String,
      })
    email: String
    @ApiProperty({
        type: String,
      })
    firstname: String
    @ApiProperty({
        type: String,
      })
    lasName: String
}