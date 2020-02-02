import { 
  IsNotEmpty,
  IsString,
  Equals,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { Comic, Slot, Event } from './events.interface';

export class ComicDto {
  @Equals(Comic)
  @IsString()
  _type: 'comic';

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class SlotDto {
  @Equals(Slot)
  @IsString()
  _type: 'slot';

  @ValidateNested({ each: true })
  @Type(() => ComicDto) 
  comics: ComicDto[];
}

export class EventDto {
  @Equals(Event)
  @IsString()
  _type: 'event';

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  place: string;

  @ValidateNested({ each: true })
  @Type(() => SlotDto) 
  slots: SlotDto[];
}