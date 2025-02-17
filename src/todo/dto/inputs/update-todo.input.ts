import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field(() => Int)
    @IsInt()
    @Min(1)
    id: number;


    @Field(() => String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(3)
    @IsOptional()
    title?: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(3)
    @IsOptional()
    description?: string;

    @Field(() => Boolean, {nullable: true})
    @IsBoolean()
    @IsOptional()
    done?: boolean = false;
}