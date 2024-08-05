import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateTodoInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(3)
    title: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(3)
    description: string;

    //@Field(() => Boolean)
    //done: boolean = false;
}