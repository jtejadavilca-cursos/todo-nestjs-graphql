import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => Boolean, {nullable: true})
    done?: boolean = false;
}