package com.cts.MFPE.Answer_Service.Exception;

public class SavingAnswerException extends Exception{
    public SavingAnswerException(){
        super("Error: Either user doesn't exists or answer or maybe both");
    }
}
