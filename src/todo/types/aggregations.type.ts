import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AggregationsType {
    @Field(() => Int)
    total: number;

    @Field(() => Int)
    completed: number;

    @Field(() => Int)
    pending: number;
}