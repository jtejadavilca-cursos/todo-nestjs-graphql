 import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String)
    helloWorld(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random();
    }

    @Query(() => Float, { name: 'randomFromZeroTo' })
    getRandomFromZeroTo(
        @Args('to', {nullable: true, type: ()=> Int}) to = 10
    ): number {
        return Math.ceil(Math.random() * to);
    }

    // 0*10 <= Math.random()*10 < 1*10
}
