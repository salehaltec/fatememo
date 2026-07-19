<?php

namespace App\Mail;

use App\Models\ContactRequest;
use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewRequestNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly array $requestData) {}

    public static function forContactRequest(ContactRequest $contact): self
    {
        return new self([
            'type' => 'درخواست مشاوره',
            'name' => $contact->name,
            'phone' => $contact->phone,
            'email' => $contact->email,
            'business_name' => $contact->business_name,
            'service' => $contact->service,
            'source' => $contact->source,
            'message' => $contact->message,
        ]);
    }

    public static function forMessage(Message $message): self
    {
        return new self([
            'type' => 'پیام فرم تماس',
            'name' => $message->name,
            'phone' => $message->phone,
            'email' => $message->email,
            'business_name' => null,
            'service' => null,
            'source' => 'contact-page',
            'message' => $message->message,
        ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'درخواست جدید در سایت '.config('app.name'));
    }

    public function content(): Content
    {
        return new Content(view: 'emails.new-request');
    }
}
