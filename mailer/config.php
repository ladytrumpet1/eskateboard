<?php
/**
 * Mailer configuration file.
 *
 * @author ThemeBucket <themebucket@gmail.com>
 * @version 0.1.0
 */

return array(
    /**
     * Email settings
     */
    'mailer' => array(
        'subject'    => 'Website Contact Form', // Email subject
        'from_email' => 'from@example.com', // Use one of your emails to avaid spam issue
        'from_name'  => 'Jane Doe', // Use a know name eg: Mr. Web Form :)
        'to_email'   => 'to@example.com', // Email recipient address
        'to_name'    => '' // Optional 
        ),

    /**
     * Fields map
     */
    'fields_map' => array(
        'DEFAULT' => array(
            'name'     => 'Name',
            'email'    => 'Email',
            'subject'  => 'Subject',
            'comments' => 'Message',
            ),

        'FORM_ALT' => array(
            'name'     => 'Name',
            'email'    => 'Email',
            'phone'    => 'Phone No',
            'subject'  => 'Subject',
            'comments' => 'Message',
            ),
        )
    );