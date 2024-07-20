// create-podcast.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePodcastDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;
}
