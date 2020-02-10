import { 
  IsNotEmpty,
  IsString,
  Equals,
  IsNumber,
  Min,
  ValidateIf,
  IsAlpha,
  IsMongoId,
} from 'class-validator';
import { EventRegistration } from '@parm/greenroom-interface';

export class EventRegistrationDto implements EventRegistration {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  eventId: string;

  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.order !== null)
  order: number | null;

  @Equals(EventRegistration)
  @IsString()
  _type: 'event-registration';

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}